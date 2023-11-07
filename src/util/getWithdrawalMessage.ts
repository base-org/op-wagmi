import { l2ToL1MessagePasserABI } from '@eth-optimism/contracts-ts'
import { type Address, decodeEventLog, type Log, type TransactionReceipt } from 'viem'
import { type WithdrawalMessage } from '../types/WithdrawalMessage.js'

export function getWithdrawalMessage(
  withdrawalReceipt: TransactionReceipt,
  l2L1MessagePasserAddress: Address,
): WithdrawalMessage {
  const messageLog = withdrawalReceipt.logs.find((log) => {
    if (log.address === l2L1MessagePasserAddress) {
      const parsed = decodeEventLog({
        abi: l2ToL1MessagePasserABI,
        data: log.data,
        topics: log.topics,
      })
      return parsed.eventName === 'MessagePassed'
    }
    return false
  }) as Log
  const parsedWithdrawalLog: { args: WithdrawalMessage } = decodeEventLog({
    abi: l2ToL1MessagePasserABI,
    data: messageLog.data,
    topics: messageLog.topics,
  }) as { args: WithdrawalMessage }

  const withdrawalMessage = {
    nonce: parsedWithdrawalLog.args.nonce,
    sender: parsedWithdrawalLog.args.sender,
    target: parsedWithdrawalLog.args.target,
    value: parsedWithdrawalLog.args.value,
    gasLimit: parsedWithdrawalLog.args.gasLimit,
    data: parsedWithdrawalLog.args.data,
  }

  return withdrawalMessage
}
