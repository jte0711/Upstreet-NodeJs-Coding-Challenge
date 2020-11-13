import kycCheck from "./index";

const runCheck = async () => {
  console.log(
    await kycCheck(
      "1999-04-21",
      "Jeremy",
      "Goodman",
      "9497700120",
      "VIC",
      "2015-05-23",
      "Junior"
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
