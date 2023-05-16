const Web3 = require('web3');

const contractAddress ='0x6383e4c34409d0D2Ac129B8C1005cb3B7e02c1F9'; // insert the address of your deployed Solidity contract here
      
const provider = new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com/');
const web3 = new Web3(provider);
const abi=[
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pin",
				"type": "uint256"
			}
		],
		"name": "Add_Recharge",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "total",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "pin",
				"type": "uint256"
			}
		],
		"name": "Apply_Discount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "Grand_Total",
				"type": "uint256"
			}
		],
		"name": "ApplyDiscount",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pin",
				"type": "uint256"
			}
		],
		"name": "Generate_Coupon_Id",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "val",
				"type": "uint256"
			}
		],
		"name": "InvalidPin",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "couponCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "pin",
				"type": "uint256"
			}
		],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "pin",
				"type": "uint256"
			}
		],
		"name": "getHash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "getTransactionAmounts",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "hashToValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "Users",
		"outputs": [
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "couponCount",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "pin",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const discountContract = new web3.eth.Contract(abi, contractAddress);
// const GrandTotal = document.getElementById("GrandTotal");
const privateKey = '5c967de6af73d97f6f0ca9a78f3fb1086f060d4a8f944425f3a744cf078a3503'; // insert your private key here
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

async function viewUserDetails(email) {
    const data = await discountContract.methods.Users(email).call();
    return data;
}



//  async function generateCoupon(email, discount) {
// 	// const email = document.getElementById("email").value;
// 	// const discount = document.getElementById("discount").value;
	
// 	await discountContract.methods.Generate_Coupon_Id(email, discount)
// 	  .send({ from: account.address,gas: 300000 })
// 	  .then((result) => {
// 		console.log(result.events.CouponGenerated.returnValues.hash);
// 		// alert("Voucher ID : "+ result.events.CouponGenerated.returnValues.hash);
// 	  })
// 	  .catch((error) => {
// 		console.error(error);
// 	  });

	  
//   }


async function generateCoupon(email, discount) {
	try {
	//   const pin = 123456;
	  const pin = Math.floor(Math.random() * 900000) + 100000; // Generate a random 6-digit pin
	  
	  const result = await discountContract.methods.Generate_Coupon_Id(email, discount, pin)
		.send({ from: account.address, gas: 300000 });
  
	  const hash = await discountContract.methods.getHash(email, pin).call();
	  console.log(pin);
	  console.log(hash);
  
	  return { hash, pin };
	//   return hash;
	} catch (error) {
	  console.error(error);
	  throw error;
	}
  }
  

 async function Apply_Discount(total, amount, id,pin) {
	try {
	  const bal = await getBalance(id,pin);
	  
	  if(bal > 0 || bal !== '0'){
		const result = await discountContract.methods.Apply_Discount(total, amount, id,pin)
		.send({ from: account.address, gas: 300000 });
	  console.log(result);
	  const res = result.events.InvalidPin.returnValues.val;
			if(res === '0'){
				return {grandTotal:0,res:res,bal:0}; 
			}else{

				const grandTotal = result.events.ApplyDiscount.returnValues.Grand_Total;
				console.log("this is res"+res);
				//   console.log(result);
				return {grandTotal:grandTotal,res:res};

			}

	  }else{
		return {grandTotal:0,res:1,bal:-1}; 
	  }
	  
	  
	} catch (error) {
	  console.log("interact catch")
	  console.error(error);
	  throw error;
	}
  }
  
  

// function Apply_Discount(total, amount, id) {
	
// 	const result = discountContract.methods. Apply_Discount(total, amount , id)
// 	  	.send({ from: account.address,gas: 300000 })
// 	  	.then((result) => {
		
// 		console.log(result.events.ApplyDiscount.returnValues.Grand_Total);
		
// 	  })
// 	  .catch((error) => {
// 		console.error(error);
// 	  });
//   }

async function Add_Recharge(hash,amount,pin) {
	
	try {
		const result = await discountContract.methods.Add_Recharge(hash,amount,pin)
		.send({ from: account.address,gas: 300000 });
		const res = result.events.InvalidPin.returnValues.val;
		// console.log(result);
		console.log(res);
		console.log("inside interact try");
		return res;
	  } catch (error) {
		
		console.log("inside interact catch");
		throw error;
	  }
      
  }

 async function getBalance(hash,pin) {
    const data = await discountContract.methods.getBalance(hash,pin).call();
    return data;
}

async function history(hash) {
    const data = await discountContract.methods.getTransactionAmounts(hash).call();
    return data;
}


module.exports = {
    viewUserDetails , getBalance , generateCoupon , Apply_Discount , Add_Recharge , history
};
