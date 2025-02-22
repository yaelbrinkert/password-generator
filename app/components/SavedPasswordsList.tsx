import { usePasswords } from "@/context/PasswordsProvider";
function SavedPasswordsList() {
  const { arrayOfPasswords, setArrayOfPasswords } = usePasswords();
  if (arrayOfPasswords.length > 0)
    return (
      <div className="py-2">
        <h2 className="text-lg font-bold uppercase mb-2">
          Vos mot-de-passes copiés :
        </h2>
        <ul>
          {arrayOfPasswords.map((pwd, index) => (
            <li key={index} className="pb-2">
              <code className="relative rounded bg-muted px-[0.5rem] py-[0.3rem] font-mono text-lg">
                {pwd}
              </code>
            </li>
          ))}
        </ul>
      </div>
    );
  return <></>;
}

export default SavedPasswordsList;
