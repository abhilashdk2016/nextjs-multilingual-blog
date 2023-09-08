'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation';

const LangSwitcher = ({locale }: { locale: string}) => {
  const targetLanguage = locale === "en" ? "de" : "en";
  const pathName = usePathname();
  const redirectTarget = () => {
    if(!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = targetLanguage;
    return segments.join("/");
  }
  return (
    <Link className='font-semibold' href={redirectTarget()} locale={targetLanguage}>
        {targetLanguage.toLocaleUpperCase()}
    </Link>
  )
}

export default LangSwitcher