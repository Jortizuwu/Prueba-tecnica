import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";

/**
 *
 * @param {pathnameLink} pathnameLink  pathname name
 * @param {name} pathnameLink route name
 *
 */

export const LinkComponent = ({ pathnameLink, name }) => {
  const [active, setActive] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    if (pathname === pathnameLink) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [pathname, pathnameLink]);

  return (
    <Link href={pathnameLink}>
      <a
        className={`link  ${
          active
            ? "bg-secondary hover:bg-yellow-400"
            : "text-white hover:bg-yellow-400 hover:text-black"
        }`}
      >
        {name}
      </a>
    </Link>
  );
};

LinkComponent.propTypes = {
  pathnameLink: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
