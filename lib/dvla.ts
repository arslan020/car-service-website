const DEFAULT_AUTOTRADER_API_URL = "https://api-sandbox.autotrader.co.uk";

export type LookupVehicle = {
  registrationNumber: string;
  make?: string;
  model?: string;
  colour?: string;
  fuelType?: string;
  transmissionType?: string;
  firstRegistrationDate?: string;
  engineCapacity?: number;
  derivative?: string;
};

type AutoTraderAuthResponse = {
  access_token: string;
  expires_at: string;
};

type AutoTraderAdvertisersResponse = {
  results?: Array<{ advertiserId?: string | number }>;
};

type AutoTraderVehicleResponse = {
  vehicle?: {
    registration?: string;
    make?: string;
    model?: string;
    colour?: string;
    fuelType?: string;
    transmissionType?: string;
    firstRegistrationDate?: string;
    engineCapacityCC?: number;
    derivative?: string;
  };
};

let cachedToken:
  | {
      value: string;
      expiresAt: number;
    }
  | null = null;

function normalizeRegistrationNumber(registrationNumber: string) {
  return registrationNumber.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function getAutoTraderConfig() {
  const apiUrl = process.env.AUTOTRADER_API_URL || DEFAULT_AUTOTRADER_API_URL;
  const partnerKey = process.env.AUTOTRADER_PARTNER_KEY;
  const partnerSecret = process.env.AUTOTRADER_PARTNER_SECRET;
  const advertiserId = process.env.AUTOTRADER_ADVERTISER_ID;

  if (!partnerKey || !partnerSecret) {
    return {
      ok: false as const,
      message: "AutoTrader API credentials are not configured on the server.",
    };
  }

  return {
    ok: true as const,
    apiUrl,
    partnerKey,
    partnerSecret,
    advertiserId,
  };
}

async function getAccessToken(apiUrl: string, partnerKey: string, partnerSecret: string) {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 30_000) {
    return cachedToken.value;
  }

  const response = await fetch(`${apiUrl}/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      key: partnerKey,
      secret: partnerSecret,
    }),
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as
    | AutoTraderAuthResponse
    | { message?: string }
    | null;

  if (!response.ok || !payload || !("access_token" in payload) || !payload.access_token) {
    throw new Error(
      (payload && "message" in payload && payload.message) ||
        "AutoTrader authentication failed.",
    );
  }

  cachedToken = {
    value: payload.access_token,
    expiresAt: new Date(payload.expires_at).getTime(),
  };

  return payload.access_token;
}

async function getAdvertiserId(apiUrl: string, accessToken: string, configuredAdvertiserId?: string) {
  if (configuredAdvertiserId) return configuredAdvertiserId;

  const response = await fetch(`${apiUrl}/advertisers?page=1&pageSize=1`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as
    | AutoTraderAdvertisersResponse
    | { message?: string }
    | null;

  if (!response.ok) {
    throw new Error(
      (payload && "message" in payload && payload.message) ||
        "Could not retrieve AutoTrader advertiser details.",
    );
  }

  const advertiserId = payload?.results?.[0]?.advertiserId;

  if (!advertiserId) {
    throw new Error("No AutoTrader advertiser was found for these credentials.");
  }

  return String(advertiserId);
}

export async function lookupDvlaVehicle(registrationNumber: string) {
  const config = getAutoTraderConfig();

  if (!config.ok) {
    return {
      ok: false as const,
      status: 500,
      message: config.message,
    };
  }

  const normalizedReg = normalizeRegistrationNumber(registrationNumber);

  if (normalizedReg.length < 2 || normalizedReg.length > 7) {
    return {
      ok: false as const,
      status: 400,
      message: "Please enter a valid registration number.",
    };
  }

  try {
    const accessToken = await getAccessToken(
      config.apiUrl,
      config.partnerKey,
      config.partnerSecret,
    );
    const advertiserId = await getAdvertiserId(
      config.apiUrl,
      accessToken,
      config.advertiserId,
    );

    const params = new URLSearchParams({
      advertiserId,
      registration: normalizedReg,
    });

    const response = await fetch(`${config.apiUrl}/vehicles?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const payload = (await response.json().catch(() => null)) as
      | AutoTraderVehicleResponse
      | { message?: string }
      | null;

    if (!response.ok) {
      const defaultMessage =
        response.status === 404
          ? "We could not find that registration."
          : "Vehicle lookup is unavailable right now.";

      return {
        ok: false as const,
        status: response.status,
        message:
          (payload && "message" in payload && payload.message) || defaultMessage,
      };
    }

    const vehicle = payload?.vehicle;

    if (!vehicle) {
      return {
        ok: false as const,
        status: 404,
        message: "We could not find that registration.",
      };
    }

    return {
      ok: true as const,
      vehicle: {
        registrationNumber: vehicle.registration || normalizedReg,
        make: vehicle.make,
        model: vehicle.model,
        colour: vehicle.colour,
        fuelType: vehicle.fuelType,
        transmissionType: vehicle.transmissionType,
        firstRegistrationDate: vehicle.firstRegistrationDate,
        engineCapacity: vehicle.engineCapacityCC,
        derivative: vehicle.derivative,
      } satisfies LookupVehicle,
    };
  } catch (error) {
    return {
      ok: false as const,
      status: 500,
      message:
        error instanceof Error
          ? error.message
          : "Vehicle lookup is unavailable right now.",
    };
  }
}
