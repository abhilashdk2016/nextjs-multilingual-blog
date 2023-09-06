export interface SiteConfig {
    siteName: string,
    description: string,
    currentlyAt: string,
    socialLinks: {
        twitter: string,
        github: string,
        linkedin: string,
        instagram: string,
        youtube: string
    }
};

const siteConfig: SiteConfig = {
    siteName: "Explorer",
    description: "A lovely travel blog with experiences of cities and places around the world",
    currentlyAt: "India",
    socialLinks: {
        twitter: "https://twitter.com/AbhilashDK2022",
        github: "https://github.com/abhilashdk2016",
        linkedin: "https://www.linkedin.com/in/abhilashdk/",
        instagram: "https://instagram.com/abhilashdk2014",
        youtube: "https://www.youtube.com/channel/UCeCnjuHGAHKt9W5fL5LcTzA"
    }
};

export default siteConfig;