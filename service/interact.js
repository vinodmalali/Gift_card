const Web3 = require('web3');
var voucher_codes = require('voucher-code-generator');
var pool = require('../database');

const privatekey = process.env.PRIVATE_KEY;

const contractAddress = process.env.CONTRACT_ADDRESS; // insert the address of your deployed Solidity contract here
      
const provider = new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com/');
const web3 = new Web3(provider);
const abi=[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
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
				"internalType": "string",
				"name": "id",
				"type": "string"
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
		"inputs": [
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "Generate_Coupon_Id",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "val",
				"type": "uint256"
			}
		],
		"name": "Recharged",
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
				"internalType": "string",
				"name": "hash",
				"type": "string"
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
			}
		],
		"name": "getHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			}
		],
		"name": "getTransactionAmounts",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "beforeredeem",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "afterredeem",
						"type": "uint256"
					}
				],
				"internalType": "struct Discount.Transaction[]",
				"name": "",
				"type": "tuple[]"
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
				"internalType": "string",
				"name": "hash",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const discountContract = new web3.eth.Contract(abi, contractAddress);
// const GrandTotal = document.getElementById("GrandTotal");
const privateKey = privatekey; // insert your private key here
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

async function viewUserDetails(email) {
    const data = await discountContract.methods.Users(email).call();
    return data;
}




async function generateCoupon(email, discount) {
	try {
	//   const pin = 123456;
	  const pin = Math.floor(Math.random() * 900000) + 100000; // Generate a random 6-digit pin
      const ida=voucher_codes.generate({
		prefix: "GIFT-",
		postfix: "-2023"
	})

	  const result = await discountContract.methods.Generate_Coupon_Id(email,ida.toString(),discount)
		.send({ from: account.address, gas: 300000 });

	 tx = result.transactionHash;
       
	  const hash = await discountContract.methods.getHash(email).call();
	  await storeInLocalDB(hash,pin)
	  console.log(pin);
	  console.log(hash);
  
	  return { hash, pin , tx };
	//   return hash;
	} catch (error) {
	  console.error(error);
	  throw error;
	}
  }
  

 async function Apply_Discount(total, amount, id,pin) {
	try {
				const pinValidationResult = await validatePin(id, pin);
				console.log(pinValidationResult);
				if (pinValidationResult.length === 0) {
					throw new Error('Invalid pin jhfhf'); // Throw an error if the pin is invalid
					}
		
				const bal = await getBalance(id,pin);
				console.log(bal);
				if(bal > 0 || bal !== '0'){
					const result = await discountContract.methods.Apply_Discount(total, amount, id)
					.send({ from: account.address, gas: 300000 });
						console.log(result);
						const res = pinValidationResult.length;
						if(res === '0'){
							return {grandTotal:0,res:res,bal:0}; 
						}else{

							const grandTotal = result.events.ApplyDiscount.returnValues.Grand_Total;
							console.log("this is res"+res);
							//   console.log(result);
							return {grandTotal:grandTotal,res:res,tx:result.transactionHash};

						}

				}else{
					return {grandTotal:0,res:1,bal:-1}; 
				}
			
			}
				
		   catch (error) {
			// console.log("interact catch")
			// console.error(error);
			throw error;
			}
		}


async function Add_Recharge(hash,amount,pin) {
	
	try {
		const pinValidationResult = await validatePin(hash, pin);

		if (pinValidationResult.length === 0) {
			 throw new Error('Invalid pin'); // Throw an error if the pin is invalid
		   }
		const result = await discountContract.methods.Add_Recharge(hash,amount)
		.send({ from: account.address,gas: 300000 });
	    // console.log(result.events.Recharged.returnValues.val);
		res = result.events.Recharged.returnValues.val;
		return res;
	  } catch (error) {
		
		// console.log("inside interact catch");
		throw error;
	  }
      
  }

 async function getBalance(hash,pin) {
	const pinValidationResult = await validatePin(hash, pin);

	if (pinValidationResult.length === 0) {
		 throw new Error('Invalid pin'); // Throw an error if the pin is invalid
	   }
    const data = await discountContract.methods.getBalance(hash).call();
    return data;
}



async function history(hash) {
    const data = await discountContract.methods.getTransactionAmounts(hash).call();
	// console.log(data);
	// const bal = await discountContract.methods.getBalance(hash).call();
    return {data : data};
}

async function storeInLocalDB(hash, pin) {
	return new Promise((resolve, reject) => {
	  pool.getConnection((err, connection) => {
		if (err) {
		  reject(err);
		  return;
		}
  
		// Execute the database query to insert the data
		const query = `INSERT INTO coupon (coupon_number, pin) VALUES (?, ?)`;
		const values = [hash, pin];
  
		connection.query(query, values, (error, results) => {
		  connection.release(); // Release the database connection
  
		  if (error) {
			reject(error);
			return;
		  }
  
		  resolve(results);
		});
	  });
	});
  }

  async function validatePin(hash, pin) {
	return new Promise((resolve, reject) => {
	  pool.getConnection((err, connection) => {
		if (err) {
		  reject(err);
		  return;
		}
  
		const query = 'SELECT * FROM coupon WHERE coupon_number = ? AND pin = ?';
		const values = [hash, pin];
  
		connection.query(query, values, (error, results) => {
		  connection.release();
  
		  if (error) {
			reject(error);
			return;
		  }
  
		  resolve(results);
		});
	  });
	});
  }
  
  
module.exports = {
    viewUserDetails , getBalance , generateCoupon , Apply_Discount , Add_Recharge , history , storeInLocalDB ,validatePin
};
