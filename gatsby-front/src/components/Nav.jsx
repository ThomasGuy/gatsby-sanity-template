import React, { useCallback, useEffect, useRef, useState } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import HomeIcon from '../assets/svg/house.svg';
import BurgerIcon from '../assets/svg/list.svg';
import { Fixed, Navbar, NavbarNav, NavbarNavItem, Banner } from '../styles';
import NavCollapse from '../hooks/NavCollapse';
import useOnClickOutside from '../hooks/useOnClickOutside';

function NavSmall({ children }) {
  return (
    <Navbar>
      <NavbarNav>{children}</NavbarNav>
    </Navbar>
  );
}

function NavItem({ open, setOpen, children, icon, linkref }) {
  const listener = useCallback(
    evt => {
      console.log(evt);
      setOpen(state => !state);
    },
    [setOpen]
  );

  const handleKey = useCallback(
    evt => {
      // keyCode = 9 "tab"
      if (evt.keyCode === 9) {
        setOpen(state => !state);
      }
    },
    [setOpen]
  );

  useEffect(() => {
    const bun = linkref.current;
    bun.addEventListener('click', listener);
    document.addEventListener('keydown', handleKey); // listen for 'tab' key

    return () => {
      bun.removeEventListener('click', listener);
      document.removeEventListener('keydown', handleKey);
    };
  }, [handleKey, linkref, listener]);

  return (
    <NavbarNavItem>
      <div
        className="icon-button"
        ref={linkref}
        onClick={() => listener}
        onKeyDown={handleKey}
        role="button"
        tabIndex={0}>
        {icon}
      </div>
      {open && children}
    </NavbarNavItem>
  );
}

function NavLink({ icon }) {
  return (
    <NavbarNavItem>
      <Link className="icon-button" to="/">
        {icon}
      </Link>
    </NavbarNavItem>
  );
}

const Nav = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const linkref = useRef(null);
  useOnClickOutside(dropdownRef, linkref, setOpen);

  const { category } = useStaticQuery(graphql`
    query {
      category: allSanityCategory {
        nodes {
          name
          slug {
            current
          }
          _id
        }
      }
    }
  `);

  return (
    <Fixed>
      <NavSmall>
        <Banner>Gallery Template</Banner>
        <NavLink icon={<HomeIcon />} key="Home" />
        <NavItem
          ref={linkref}
          linkref={linkref}
          icon={<BurgerIcon />}
          key="burger"
          open={open}
          setOpen={setOpen}>
          <NavCollapse list={category.nodes} dropref={dropdownRef} />
        </NavItem>
      </NavSmall>
    </Fixed>
  );
};

export default Nav;
