import { encodeAbiParameters, keccak256, pad, parseAbiParameters } from "viem";

export function getMessageSlot(hashedWithdrawal: `0x${string}`) {
  return keccak256(
    encodeAbiParameters(parseAbiParameters('bytes32, uint256'), [
      hashedWithdrawal,
      BigInt(pad('0x0')),
    ]),
  );
}