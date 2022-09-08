import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Message } from "../../constants/schemas";
import { trpc } from "../../utils/trpc";

function RoomPage() {
  const { query } = useRouter();
  const roomId = query.roomId as string;
  const { data: session } = useSession();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const { mutateAsync: sendMessageMutation } = trpc.useMutation([
    "room.send-message",
  ]);

  trpc.useSubscription(["room.onSendMessage", { roomId }], {
    onNext: (message) => {
      setMessages((m) => [...m, message]);
    },
  });

  if (!session) {
    return (
      <div>
        <button className="btn" onClick={() => signIn()}>
          Login
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-xl m-auto items-center">
      <h1 className="mb-4 mt-2 text-xl font-bold">Welcome to room {roomId}</h1>
      <form
        className="flex flex-col items-center"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessageMutation({ roomId, message });
        }}
      >
        <textarea
          className="textarea textarea-bordered"
          placeholder="What do you want to say?"
          style={{ width: "300px" }}
        ></textarea>
        <button className="btn mt-2">Send Message</button>
      </form>
      <ul>
        {messages.map((m) => (
          <li>{m.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default RoomPage;
