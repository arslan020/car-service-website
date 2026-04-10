import { PageIntro } from "@/components/page-intro";

export default function AboutPage() {
  return (
    <PageIntro eyebrow="About" title="Your local garage">
      <p>
        Replace this copy with your story: how long you have served the area, your values, and the experience your
        technicians bring.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Certifications and trade memberships.</li>
        <li>Brands and vehicle types you specialise in.</li>
        <li>Warranty on parts and labour (your terms).</li>
      </ul>
      <p>Add real workshop photos when you have them — they outperform generic stock for trust.</p>
    </PageIntro>
  );
}
