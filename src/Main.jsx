import Footer from "./components/footer";
import AllDaysView from "./components/AllDaysView";
import { useState } from "react";
import NewThoughtCreation from "./components/newThoughtCreation";

const Main = () => {
  const [newThoughtCreationInProgress, setNewThoughtCreationInProgress] =
    useState(true);

  return (
    <>
      <AllDaysView />

      <NewThoughtCreation
        newThoughtCreationInProgress={newThoughtCreationInProgress}
        setNewThoughtCreationInProgress={setNewThoughtCreationInProgress}
      />
      <Footer
        display={!newThoughtCreationInProgress}
        onCreateThought={() => setNewThoughtCreationInProgress(true)}
      />
    </>
  );
};

export default Main;
