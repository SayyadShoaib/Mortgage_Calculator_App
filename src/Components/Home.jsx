import { useState } from "react";

function Home() {
  const [state, setState] = useState({
    purchase: 0,
    downpayment: 0,
    time: 0,
    interest: 0,
    loanamount: 0,
    permonthamount: 0,
  });

  const handlepurchace = (e) => {
    setState({ ...state, purchase: e.target.value });
    // console.log(e.target.value);
  };

  const handledownpayment = (e) => {
    setState({ ...state, downpayment: e.target.value });
  };

  const handlerepayment = (e) => {
    setState({ ...state, time: e.target.value });
  };

  const handleinterest = (e) => {
    setState({ ...state, interest: e.target.value });
  };

  const handlemortgage = () => {
    const remaining_amount = state.purchase - state.downpayment;
    if (remaining_amount < 0) {
      alert("Your Payment is done");

      setState({ ...state, downpayment: 0 });
    } else if (remaining_amount === 0) {
      alert("please select the mandatory fields");
    } else {
      const rate_by_n = state.interest / 1200;
      const top_part = rate_by_n * remaining_amount;
      const n_t = -12 * state.time;
      const lower_calc = 1 - Math.pow(1 + rate_by_n, n_t);
      let Mortgage = (top_part / lower_calc).toFixed(2);

      setState({
        ...state,
        permonthamount: Mortgage,
        loanamount: remaining_amount,
      });
    }
  };

  return (
    <>
      <div
        id="container"
        className="flex flex-col absolute top-1/4 left-1/4 border gap-5 p-10 font-semibold shadow-lg"
      >
        <div>
          <h2 className="text-xl font-bold text-left py-5">
            Mortgage Application{" "}
          </h2>
        </div>

        <div
          id="child"
          className="grid grid-cols-3 gap-6 text-left max-sm:grid-cols-1 text-sm"
        >
          <div className="grid grid-cols-1 gap-1 px-5">
            <div className="grid grid-flow-row">
              <p>
                Purchase Price : <span>${state.purchase.toLocaleString()}</span>
              </p>
            </div>
            <div className="flex flex-row justify-center items-center">
              <input
                step={1000}
                type="range"
                min={0}
                max={100000}
                onChange={handlepurchace}
                className="hover:cursor-pointer w-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1 px-5">
            <div className="grid grid-flow-row">
              <p>
                Down Payment :{" "}
                <span>${state.downpayment.toLocaleString()}</span>
              </p>
            </div>
            <div className="flex flex-row justify-center items-center">
              <input
                type="range"
                step={1000}
                min={0}
                max={100000}
                onChange={handledownpayment}
                className="hover:cursor-pointer w-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1 px-5">
            <div className="grid grid-flow-row">
              <p>
                Re-Payment time: <span>{state.time} Years</span>
              </p>
            </div>
            <div className="flex flex-row justify-center items-center">
              <input
                type="range"
                onChange={handlerepayment}
                min={0}
                max={25}
                className="hover:cursor-pointer w-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1 px-5">
            <div className="grid grid-flow-row">
              <p>
                Interest Rate : <span>{state.interest}%</span>
              </p>
            </div>
            <div className="flex flex-row justify-center items-center">
              <input
                type="range"
                min={0}
                max={35}
                onChange={handleinterest}
                className="hover:cursor-pointer w-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1 px-5">
            <div className="grid grid-flow-row ">
              <p>Loan Amount :</p>
            </div>
            <div className="flex flex-row justify-center items-center text-xl font-bold ">
              <h3 classname="text-left">$ {state.loanamount}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1 px-5">
            <div className="grid grid-flow-row">
              <p>Estimated Amount per month :</p>
            </div>
            <div className="flex flex-row justify-center items-center text-xl font-bold ">
              <h3>$ {state.permonthamount}</h3>
            </div>
          </div>

          <div>
            <div className="bg-blue-400 text-center">
              <button
                className="text-white py-2 capitalize"
                onClick={handlemortgage}
              >
                Get a mortagage quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
