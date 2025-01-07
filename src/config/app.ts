interface AppConfig {
  name: string;
  github: {
    title: string;
    url: string;
  };
  author: {
    name: string;
    url: string;
  };
}

export const appConfig: AppConfig = {
  name: "Theras App",
  github: {
    title: "Theras Starter",
    url: "",
  },
  author: {
    name: "dellwatson",
    url: "https://github.com/dellwatson/",
  },
};
