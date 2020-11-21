const browse = async (e) => {
  e.preventDefault();
  var cid = await lookupContract.methods.fetchPage(e.target[0].value).call(
    { from: "0x0bEA58d399873E67fcf9989AfC0C6A456EC0e922" }, // fetch from metamask
    function (err, res) {
      if (err) {
        console.log(err);
      }
      return res || "";
    }
  );
  console.log(cid);
  // fetch from ipfs
};

document.getElementById("search-form").addEventListener("submit", browse);

if (typeof web3 !== "undefined") {
  web3 = new Web3(Web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

var lookupContract = new web3.eth.Contract(
  [
    {
      constant: false,
      inputs: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "cid",
          type: "string",
        },
      ],
      name: "addPage",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "cid",
          type: "string",
        },
      ],
      name: "updatePage",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "name",
          type: "string",
        },
      ],
      name: "fetchPage",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "",
          type: "bytes32",
        },
      ],
      name: "pages",
      outputs: [
        {
          name: "owner",
          type: "address",
        },
        {
          name: "cid",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "source",
          type: "string",
        },
      ],
      name: "stringToBytes32",
      outputs: [
        {
          name: "result",
          type: "bytes32",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ],
  "0xf1e8Ec2817034CF28C5dDd6B398a3E263bd6E60F"
);
