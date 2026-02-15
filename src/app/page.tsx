import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import CodeSection from "@/components/CodeSection";
import GemsSection from "@/components/GemsSection";
import StickyFooterReveal from "@/components/StickyFooterReveal";

export default function Home() {
  return (
    <StickyFooterReveal>
      <Hero />
      <ProjectsSection />
      <SkillsSection />
      <CodeSection />
      <GemsSection />
    </StickyFooterReveal>
  );
}
