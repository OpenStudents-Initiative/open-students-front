import { IntlShape, useIntl } from "react-intl";
import SearchBar from "./searchBar/SearchBar";
import { SearchResultsList } from "./searchBar/SearchResultsList";
import { useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { currentProfessorIdState } from "../atoms/defaultAtoms";
import { AUTH_ROUTE, HOME_ROUTE, PROFILE_ROUTE } from "../utils/consts";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function NavBar() {
  const intl = useIntl();
  const userAuthenticated = useIsAuthenticated()();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const setCurrentProfessorId = useSetRecoilState(currentProfessorIdState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const textConstants = {
    login: intl.formatMessage({ id: "headerLogin" }),
    openStudents: intl.formatMessage({ id: "openStudents" }),
    account: intl.formatMessage({ id: "headerAccount" }),
  };

  const text = userAuthenticated ? textConstants.account : textConstants.login;
  const [results, setResults] = useState<{ name: string; id: string }[]>([]);
  const [showResults, setShowResults] = useState(false);

  return (
    <nav className="bg-background flex justify-between items-center p-4 shadow-md sticky top-0 right-0 left-0 z-50">
      <LogoOpenStudents />
      {userAuthenticated && (
        <>
          <SearchBar
            results={results}
            setResults={setResults}
            setShowResults={setShowResults}
          />
          {showResults && (
            <SearchResultsList
              results={results}
              setCurrentProfessorId={setCurrentProfessorId}
              setShowResults={setShowResults}
            />
          )}
        </>
      )}
      <LoginButton
        text={text}
        navigate={navigate}
        anchorEl={anchorEl}
        signOut={signOut}
        setCurrentProfessorId={setCurrentProfessorId}
        userAuthenticated={userAuthenticated}
        handleMenu={handleMenu}
        handleClose={handleClose}
        intl={intl}
      />
    </nav>
  );
}

const LogoOpenStudents = () => (
  <Link to={HOME_ROUTE}>
    <img
      className="h-8"
      src="openstudents-high-resolution-logo-transparent.png"
      alt="Logo Open Students"
    />
  </Link>
);

const LoginButton = ({
  text,
  navigate,
  userAuthenticated,
  signOut,
  handleClose,
  intl,
}: {
  text: string | undefined;
  navigate: NavigateFunction;
  userAuthenticated: boolean;
  anchorEl: HTMLElement | null;
  signOut: () => void;
  setCurrentProfessorId: SetterOrUpdater<string>;
  handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  intl: IntlShape;
}) => (
  <>
    {!userAuthenticated ? (
      <Button
        onClick={() => {
          navigate(AUTH_ROUTE);
        }}
      >
        {text}
      </Button>
    ) : (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>{text}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              navigate(PROFILE_ROUTE);
              handleClose();
            }}
          >
            {intl.formatMessage({ id: "headerProfile" })}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              signOut();
              navigate(HOME_ROUTE);
            }}
          >
            {intl.formatMessage({ id: "headerLogout" })}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )}
  </>
);
