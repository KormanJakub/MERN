const NavBar = ({ onSelect }) => {

  return (
    <nav>
      <div class="flex gap-5 justify-content-between bg-gray-400 pr-4 pl-4">
      <div className="flex gap-5">
        <p class="cursor-pointer" onClick={() => onSelect("home")}>NOVINY.SK</p>
        <p class="cursor-pointer" onClick={() => onSelect("about")}>About</p>
        <p class="cursor-pointer" onClick={() => onSelect("articles")}>Articles</p>
      </div>
      <div className="flex justify gap-5 justify-content-center">
        <p class="cursor-pointer" onClick={() => onSelect("admin")}>Admin</p>
        <p class="cursor-pointer" onClick={() => onSelect("login")}>Login</p>
        <p class="cursor-pointer" onClick={() => onSelect("register")}>Register</p>
      </div>
      </div>
    </nav>
  );
};
export default NavBar;
