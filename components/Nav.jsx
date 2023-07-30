"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    fetchProviders();
  }, []);

  const renderSingInProviders = () => {
    return (
      providers &&
      Object.values(providers).map((provider) => (
        <button
          type="button"
          key={provider.name}
          onClick={() => signIn(provider.id)}
          className="black_btn"
        >
          Sign In
        </button>
      ))
    );
  };

  const renderProfileImage = (onClickFunction) => {
    return (
      <Image
        src={session?.user.image}
        width={37}
        height={37}
        className="rounded-full"
        alt="profile"
        onClick={onClickFunction}
      />
    );
  };

  const handleProfileClick = () => {
    setToggleDropdown((prev) => !prev);
  };

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              {renderProfileImage(handleProfileClick)}
            </Link>
          </div>
        ) : (
          <>{renderSingInProviders()}</>
        )}
      </div>

      {/* Movile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            {renderProfileImage(handleProfileClick)}
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut;
                  }}
                  className="mt- w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>{renderSingInProviders()}</>
        )}
      </div>
    </nav>
  );
};

export default Nav;
