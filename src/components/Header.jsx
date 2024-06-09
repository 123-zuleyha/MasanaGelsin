import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = new useNavigate();

  const [menuItems] = useState([
    { href: '#about', title: 'GÜNÜN MENÜSÜ' },
    { href: '#menu', title: 'MENÜ' },
    { href: '#comment', title: 'YORUMLAR' },
    { href: '/favoriler', title: 'FAVORİLER' },
  ]);

  const redirectToSepet = () => {
    navigate("/sepet");
  };

  const redirectToAdmin = () => {
    navigate("/adminLogin");
  };

  return (
    <header className="absolute z-50 top-0 w-full">
      <div className="mx-auto py-4 flex flex-row items-center">
        <a href="/">
          <img src="https://i.ibb.co/hVMPstk/logo-ilk.png" alt="Masana Gelsin" className="lg:w-[170px]" />
        </a>
        <nav className="flex items-center justify-center gap-6 pl-6 nl-6 border-l border-gray-200 text-base">
          {menuItems.map((menuItem, index) => (
            <a key={index} href={menuItem.href} className="font-medium text-black hover-underline">{menuItem.title}</a>
          ))}
        </nav>
        <div className="ml-auto flex items-center"></div>
        <div className="mx-8"></div>
        <a onClick={redirectToSepet} type='button' className="px-3 py-2 text-md font-semibold text-white bg-red-600 rounded-full cursor-pointer">SEPET</a>
        <a onClick={redirectToAdmin} type='button' className="px-3 py-2 text-md font-semibold text-white bg-red-600 rounded-full cursor-pointer">ADMİN</a>
      </div>
    </header>
  );
}

export default Header;
