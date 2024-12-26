"use client";

import AdminAboutView from "@/components/admin-view/about";
import AdminContactView from "@/components/admin-view/contact";
import AdminEducationView from "@/components/admin-view/education";
import AdminExperienceView from "@/components/admin-view/experience";
import AdminHomeView from "@/components/admin-view/home";
import AdminProjectsView from "@/components/admin-view/projects";
import Login from "@/components/admin-view/login";
import { useState, useEffect } from "react";
import { addData, getData, updateData, login } from "@/services";

const initialHomeViewData = {
  heading: "",
  summary: "",
};

const initialAboutViewData = {
  AboutMe: "",
  Projects: "",
  Experience: "",
  Clients: "",
  Skills: "",
};

const initialExperienceViewData = {
  Position: "",
  Company: "",
  Duration: "",
  Location: "",
  JobProfile: "",
};

const initialProjectsViewData = {
  ProjectName: "",
  Technologies: "",
  Website: "",
  GitHub: "",
};

const initialEducationViewData = {
  Timeline: "",
  College: "",
  Degree: "",
};

const initialLoginData = {
  username: "",
  password: "",
};

export default function AdminView() {
  const [currentSelectedTab, SetCurrentSelectedTab] = useState("home");
  const [homeViewFormData, setHomeViewFormData] = useState(initialHomeViewData);
  const [aboutViewFormData, setAboutViewFormData] =
    useState(initialAboutViewData);
  const [ExperienceViewFormData, setExperienceViewFormData] = useState(
    initialExperienceViewData
  );
  const [EducationViewFormData, setEducationViewFormData] = useState(
    initialEducationViewData
  );
  const [ProjectsViewData, setProjectsViewData] = useState(
    initialProjectsViewData
  );
  const [loginFormData, setLoginFormData] = useState(initialLoginData);

  const [allData, setAllData] = useState({});
  const [update, setUpdate] = useState(false);
  const [authUser, setAuthUser] = useState(false);

  const menuItems = [
    {
      id: "home",
      label: "Home",
      Component: (
        <AdminHomeView
          formData={homeViewFormData}
          setFormData={setHomeViewFormData}
          handleSaveInfo={handleSaveInfo}
        />
      ),
    },
    {
      id: "about",
      label: "About",
      Component: (
        <AdminAboutView
          formData={aboutViewFormData}
          setFormData={setAboutViewFormData}
          handleSaveInfo={handleSaveInfo}
        />
      ),
    },
    {
      id: "experience",
      label: "Experience",
      Component: (
        <AdminExperienceView
          formData={ExperienceViewFormData}
          setFormData={setExperienceViewFormData}
          handleSaveInfo={handleSaveInfo}
          data={allData?.experience}
        />
      ),
    },
    {
      id: "education",
      label: "Education",
      Component: (
        <AdminEducationView
          formData={EducationViewFormData}
          setFormData={setEducationViewFormData}
          handleSaveInfo={handleSaveInfo}
          data={allData?.education}
        />
      ),
    },
    {
      id: "projects",
      label: "Projects",
      Component: (
        <AdminProjectsView
          formData={ProjectsViewData}
          setFormData={setProjectsViewData}
          handleSaveInfo={handleSaveInfo}
          data={allData?.projects}
        />
      ),
    },
    {
      id: "contact",
      label: "Contact",
      Component: <AdminContactView data={allData?.contact}/>,
    },
  ];

  async function extractAllData() {
    const data = await getData(currentSelectedTab);
    console.log(data);

    if (data?.success) {
      setAllData({
        ...allData,
        [currentSelectedTab]: data.data,
      });
    }

    if (
      currentSelectedTab === "home" &&
      data &&
      data.data &&
      data.data.length
    ) {
      setHomeViewFormData(data && data.data[0]);
      setUpdate(true);
      console.log(setUpdate);
    }

    if (
      currentSelectedTab === "about" &&
      data &&
      data.data &&
      data.data.length
    ) {
      setAboutViewFormData(data && data.data[0]);
      setUpdate(true);
    }
  }

  async function handleSaveInfo() {
    const dataMap = {
      home: homeViewFormData,
      about: aboutViewFormData,
      education: EducationViewFormData,
      experience: ExperienceViewFormData,
      projects: ProjectsViewData,
    };

    console.log(update);

    const response = update
      ? await updateData(currentSelectedTab, dataMap[currentSelectedTab])
      : await addData(currentSelectedTab, dataMap[currentSelectedTab]);
    console.log(response, "response");

    if (response.success) {
      resetFormData();
      extractAllData();
    }
  }

  useEffect(() => {
    extractAllData();
  }, [currentSelectedTab]);

  function resetFormData() {
    setHomeViewFormData(initialHomeViewData);
    setAboutViewFormData(initialAboutViewData);
    setEducationViewFormData(initialEducationViewData);
    setExperienceViewFormData(initialExperienceViewData);
    setProjectsViewData(initialProjectsViewData);
    setLoginFormData(initialLoginData);
  }

  useEffect(() => {
    setAuthUser(JSON.parse(sessionStorage.getItem("authUser")));
  }, []);

  async function handleLogin() {
    console.log(loginFormData);

    const res = await login(loginFormData);

    console.log(res, "login");

    if (res?.success) {
      console.log("True");
      setAuthUser(true);
      sessionStorage.setItem("authUser", JSON.stringify(true));
    }
  }

  if (!authUser) {
    return (
      <Login
        formData={loginFormData}
        setFormData={setLoginFormData}
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <div className="border-b border-gray-200">
      <nav className="mb-0.5 flex justify-center space-x-6" role="tablist">
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="p-4 font-bold text-xl text-black"
            onClick={() => {
              SetCurrentSelectedTab(item.id);
              console.log(item.id);
              resetFormData();
              setUpdate(false);
            }}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => {
            setAuthUser(false),
              sessionStorage.removeItem("authUser"),
              resetFormData();
          }}
          type="button"
          className="p-4 font-bold text-xl text-black"
        >
          Logout
        </button>
      </nav>
      <div className="mt-10 p-10">
        {menuItems.map(
          (item) => item.id === currentSelectedTab && item.Component
        )}
      </div>
    </div>
  );
}
