import { RolesType } from "@/app/oferty/OffersPage";
import { Dispatch, SetStateAction } from "react";

interface RolesSearchProps {
  roles: RolesType[];
  setRoles: Dispatch<SetStateAction<RolesType[]>>;
}

const RolesSearch = ({ roles, setRoles }: RolesSearchProps) => {
  function changeRoles(name: string) {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.name === name ? { name: name, visible: !role.visible } : role
      )
    );
  }

  return (
    <section className="flex w-full items-center justify-start gap-10 text-black">
      {roles.map((role, ind) => (
        <div key={ind} className="flex items-center justify-center gap-1">
          <p>{role.name}</p>
          <input
            type="checkbox"
            checked={role.visible}
            onChange={() => changeRoles(role.name)}
          />
        </div>
      ))}
    </section>
  );
};

export default RolesSearch;
