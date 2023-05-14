import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillDashboard, AiOutlineBars } from 'react-icons/ai';
import { MdShowChart } from 'react-icons/md';
import { FaBookOpen } from 'react-icons/fa';
import { IoMdExit, IoMdMoon, IoLogoGithub } from 'react-icons/io';

import { useAuth } from '@/lib/auth';

const Navbar = () => {
  const { signout } = useAuth();

  return (
    <div className="flex justify-center items-center text-gray-1 h-20 px-20">
      <span className="text-5xl font-bold mr-auto">統計</span>
      <NavLink to="dashboard" Icon={AiFillDashboard} />
      <NavLink to="graphs" Icon={MdShowChart} />
      <NavLink to="items" Icon={AiOutlineBars} />
      <NavLink to="reading" Icon={FaBookOpen} />
      <span className="ml-auto flex space-x-4">
        {/* <IoMdMoon size={24} /> */}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/nanyaDev/statkani"
        >
          <IoLogoGithub size={24} />
        </a>
        <button onClick={signout}>
          <IoMdExit size={24} />
        </button>
      </span>
    </div>
  );
};

const NavLink = ({ to, Icon }) => {
  const router = useRouter();
  const active = router.pathname.includes(to);

  return (
    <Link href={`/${to}`}>
      <a className="flex justify-center items-center mx-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center my-2.5">
            <Icon size={20} />
            <span className="ml-3">
              {to.charAt(0).toUpperCase() + to.slice(1)}
            </span>
          </div>
          <div
            className={`h-px w-full bg-gradient-to-r from-bg via-gray-1 to-bg ${
              !active && 'hidden'
            }`}
          ></div>
        </div>
      </a>
    </Link>
  );
};

export default Navbar;
