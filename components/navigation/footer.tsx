import siteConfig from "@/config/site";
import PaddingContainer from "../layout/padding-container";
import SocialLink from "../elements/social-link";
import { getDictionary } from "@/lib/getDictionary";

const Footer = async ({locale }: { locale: string}) => {
  const dictionary = await getDictionary(locale);
  return (
    <div className="py-6 border-t mt-10">
        <PaddingContainer>
            <div>
                <h2 className="text-3xl font-bold">{ siteConfig.siteName } </h2>
                <p className="max-w-md text-neutral-700 text-lg">{dictionary.footer.description}</p>
            </div>
            <div className="mt-6 flex justify-between gap-4 flex-wrap">
                <div>
                    <div className="font-medium text-lg">
                        #exploretheworld
                    </div>
                    <div className="flex items-center gap-3 text-neutral-600 mt-2">
                        <SocialLink platform="twitter" link={ siteConfig.socialLinks.twitter }/>
                        <SocialLink platform="github" link={ siteConfig.socialLinks.github }/>
                        <SocialLink platform="linkedin" link={ siteConfig.socialLinks.linkedin }/>
                        <SocialLink platform="youtube" link={ siteConfig.socialLinks.youtube }/>
                        <SocialLink platform="instagram" link={ siteConfig.socialLinks.instagram }/>
                    </div>
                </div>
                <div>
                    <div className="text-sm text-neutral-400">{dictionary.footer.currentlyAtText}</div>
                    <div className="bg-white shadow-md rounded-md px-3 py-2 flex items-center gap-2">
                        <div className="bg-emerald-400 rounded-full h-2 w-2" />
                        { siteConfig.currentlyAt }
                    </div>
                </div>
            </div>
            <div className="border-t py-3 flex items-center gap-4 flex-wrap justify-between mt-16">
                <div className="text-sm text-neutral-400">
                {dictionary.footer.rightsText} {new Date().getFullYear()}
                </div>
                <div className="text-sm">{dictionary.footer.creatorText}</div>
            </div>
        </PaddingContainer>
    </div>
  )
}

export default Footer;