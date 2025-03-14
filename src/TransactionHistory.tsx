import {useState,useEffect} from 'react'
import { SuiClient, getFullnodeUrl,PaginatedTransactionResponse,SuiTransactionBlockResponse  } from '@mysten/sui/client';
import { faucet_config } from '../common/config';
import "@radix-ui/themes/styles.css";
import CopyButton from './components/CopyButton';
import { Theme, Button,TextField,Box,Flex } from "@radix-ui/themes";
import ViewButton from './components/ViewButton'

// 添加地址格式化函数
const formatAddress = (address: string): string => {
    if (!address) return '';
    // 确保地址以 0x 开头
    const normalizedAddress = address.startsWith('0x') ? address : `0x${address}`;
    // 如果地址长度小于 10，直接返回
    if (normalizedAddress.length < 10) return normalizedAddress;
    // 取前 6 位和后 4 位，中间用 ... 连接
    return `${normalizedAddress.slice(0, 6)}...${normalizedAddress.slice(-4)}`;
};

const getRecipient = (tx :SuiTransactionBlockResponse) => {
    if(tx.effects && tx.effects.created && tx.effects.created.length == 1 ){
        let owner = tx.effects?.created!.at(0);
        let addr = (owner as unknown as {owner: {AddressOwner : string} } ).owner.AddressOwner;
        return addr;
    }
    return "";
}

const viewTransaction = (txId: string) => {
    window.open(`https://testnet.suivision.xyz/txblock/${txId}`, '_blank');
};

const  TransactionHistory = (props:{ transactions:SuiTransactionBlockResponse[]})=>{
console.log('arr  length',props.transactions.length);

return (
<>
    <br/>
    <hr/>
    <h2 className='text-2xl font-bold mb-4'>Transaction History</h2>
    <div className='div_600'>
    {
        props.transactions.map((tx:SuiTransactionBlockResponse)=>{
        let recipient = getRecipient(tx);
        let short_recipient = formatAddress(recipient)
        return (<div 
            key = {tx.digest}
            className="  rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow dark:border-zinc-800 dark:text-zinc-50 overflow-hidden transition-all hover:shadow-md mb-2 dark:bg-gray-800">
        
            <div
                className=" flex flex-col space-y-1.5 p-6 py-3 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border-b dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="tracking-tight text-base font-medium text-gray-900 dark:text-gray-100">Transaction</div><span
                        className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">{tx.effects!.status.status}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                    <div className="font-mono  text-gray-500 dark:text-gray-400 truncate max-w-[40%]">
                        {tx.digest}</div>
                    <div className="flex space-x-4 p-8">
                        <CopyButton display="Copy" copy_value={tx.digest} size={20} fontSize={12}></CopyButton>
                        <span className="w-1"></span>
                        <ViewButton onClick={(e)=>{viewTransaction(tx.digest)}}  display="View" size={20} fontSize={12}></ViewButton>
                    </div>
                </div>
            </div>
            <div className="p-6 py-2 ">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div>
                        <p className="font-medium text-gray-500 dark:text-gray-400">Amount</p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">1.000000 SUI</p>
                    </div>
                    <div>
                        <p className="font-medium text-gray-500 dark:text-gray-400">Recipient</p>
                        <CopyButton display={short_recipient} copy_value={recipient} size={20} fontSize={12}></CopyButton>
                    </div>
                    <div>
                        <p className="font-medium text-gray-500 dark:text-gray-400">Time</p>
                        <div className="font-semibold text-gray-900 dark:text-gray-100 text-nowrap"><span>{new Date(Number(tx.timestampMs)).toLocaleString()}</span>
                        </div>
                    </div>
                    <div>
                        <p className="font-medium text-gray-500 dark:text-gray-400">Execute Epoch</p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{tx.effects!.executedEpoch}</p>
                    </div>
                </div>
            </div>
        </div>) })
    // end map
    } 
    </div>
</>);
};

export default TransactionHistory;