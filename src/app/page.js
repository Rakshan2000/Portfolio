import ClientAboutView from "@/components/client-view/about";
import ClientContactView from "@/components/client-view/contact";
import ClientExperienceAndEducation from "@/components/client-view/experience";
import ClientHomeView from "@/components/client-view/home";
import ClientProjectView from "@/components/client-view/project";

async function extractAllData(currentSection) {
  const res = await fetch(
    `http://localhost:3000/api/${currentSection}/get`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data && data.data;
}

export default async function Home() {
  const homeSectionData = await extractAllData("home");
  const aboutSectionData = await extractAllData("about");
  const experienceSectionData = await extractAllData("experience");
  const educationSectionData = await extractAllData("education");
  const projectSectionData = await extractAllData("projects");
  const clientContactData = await extractAllData("contact")

  return (

    
    <div>
      <ClientHomeView data={homeSectionData} />
      <ClientAboutView data={aboutSectionData && aboutSectionData.length ? aboutSectionData[0]: []} />
      <ClientExperienceAndEducation
        educationData={educationSectionData}
        experienceData={experienceSectionData}
      />
    <ClientProjectView data={projectSectionData} />
      <ClientContactView data={clientContactData}/>
    </div>
  );
}
