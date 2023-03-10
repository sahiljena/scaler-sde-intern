import Spinner from "./Spinner";

const Participants = ({
  participants,
  setAddedParticipants,
  addedParticipants,
}) => {
  const handleAddParticpant = (key) => {
    // handle click on add participant
    const index = addedParticipants.indexOf(key);
    if (index === -1) {
      setAddedParticipants([...addedParticipants, key]);
    } else {
      setAddedParticipants(addedParticipants.filter((value, i) => i !== index));
    }
  };
  return (
    <div className="overflow-auto h-80">
      <ul className="max-w-3xl m-auto divide-y divide-gray-200 p-2 ">
        {participants.length === 0 && <>Loading...</>}
        {participants?.map((particpant) => {
          let isChecked =
            addedParticipants.indexOf(particpant._id) === -1 ? false : true;
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
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      defaultChecked={isChecked}
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
    </div>
  );
};

export default Participants;
