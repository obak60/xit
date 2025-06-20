import { FaXmark } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import dummyImg from '@/assets/images/dummy-img.jpg';


const MobileMenu = ({ logo, navItems, isNavOpen, setIsNavOpen }) => {

    return (
        <div className={`w-80 h-screen bg-primary fixed z-[100] top-0 ${isNavOpen ? 'right-0' : '-right-[500px]'} duration-300 p-5`}>
            <div className='flex justify-between items-center'>
                <Image src={logo || dummyImg} width={100} height={100} alt='Logo' />
                <button onClick={() => setIsNavOpen(false)} className='p-2 text-xl rounded-full bg-dark text-white'>
                    <FaXmark />
                </button>
            </div>
            <nav className='px-6 pt-6 space-y-2'>
                {
                    navItems?.map(item =>
                        <div key={item?.id} className='block text-white pb-2 border-b border-b-white'>
                            <Link href={item?.url} onClick={() => setIsNavOpen(false)} >
                                {item?.name}
                            </Link>
                        </div>
                    )
                }
            </nav>
        </div>
    );
};

export default MobileMenu;
