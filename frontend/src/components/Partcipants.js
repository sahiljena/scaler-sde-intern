import Spinner from "./Spinner";

const Participants = ({
  participants,
  setAddedParticipants,
  addedParticipants,
}) => {
  const handleAddParticpant = (key) => {
    const index = addedParticipants.indexOf(key);
    if (index === -1) {
      setAddedParticipants([...addedParticipants, key]);
    } else {
      setAddedParticipants(addedParticipants.filter((value, i) => i !== index));
    }
  };
  return (
    <>
      <ul className="max-w-3xl m-auto divide-y divide-gray-200 p-2">
        {!participants && <Spinner />}
        {participants?.map((particpant) => {
          return (
            <li className="border p-2" key={particpant._id}>
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate ">
                    {particpant.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate ">
                    {particpant.email}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                  {" "}
                  <div className="flex items-center mb-4">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      defaultValue
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                      onClick={() => handleAddParticpant(particpant._id)}
                    />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900"
                    >
                      Add
                    </label>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Participants;
