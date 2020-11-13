import kycCheck from "./index";

// Temporary Checking
const runCheck = async () => {
  console.log(
    await kycCheck(
      "1999-04-21",
      "Jeremy",
      "Goodman",
      "9497700120",
      "VIC",
      "2020-01-01",
      "Robert"
    )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        console.log(e);
      })
  );
};

runCheck();
