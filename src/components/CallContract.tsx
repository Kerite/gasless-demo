import type { FormEvent } from "react";
import { erc20Abi } from "viem";
import { useReadContract, useWriteContract } from "wagmi";

export function CallContract({
  accountAddress,
  erc20Address
}: {
  erc20Address: `0x${string}`,
  accountAddress: `0x${string}`
}) {
  const { data: balance } = useReadContract({
    abi: erc20Abi,
    address: erc20Address,
    functionName: "balanceOf",
    args: [accountAddress],
    query: {
      enabled: true,
    },
  });
  const { data: hash, writeContract, isPending } = useWriteContract()

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement);
    const targetAddress = formData.get("targetAddress") as `0x${string}`;
    const amount = formData.get("amount") as string;

    writeContract({
      abi: erc20Abi,
      address: erc20Address,
      functionName: "transfer",
      args: [targetAddress, BigInt(amount)]
    })
  }

  return (
    <div>
      <h2>Transfer Erc20 Token</h2>
      <div>
        Balance: {balance}
      </div>
      <form onSubmit={submit}>
        <input name="targetAddress" placeholder="Address" required />
        <input
          name="amount"
          placeholder="Amount"
          type="number"
          step="1"
          required
        />
        <button type="submit">
          {isPending ? 'Confirming...' : 'Transfer'}
        </button>
      </form>
      {hash && <div>Transaction Hash: {hash}</div>}
    </div>
  )
}