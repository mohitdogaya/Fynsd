// src/components/UpgradeButton.jsx
import api from "../lib/api";
import toast from "react-hot-toast";

export default function UpgradeButton({ userId }) {
  const handleUpgrade = async () => {
    try {
      // Step 1: Create order
      const { data } = await api.post("/payment/create-order", { amount: 499 });
      const { id: orderId, amount, currency } = data.order;

      // Step 2: Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "Wisd Finance",
        description: "Premium Membership Upgrade",
        order_id: orderId,
        handler: async function (response) {
          try {
            // Step 3: Verify payment
            const verifyRes = await api.post("/payment/verify-payment", {
              userId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              toast.success("Payment successful, Premium Activated!");
              // Notify parent components
              window.dispatchEvent(new Event("profileUpdated"));
            } else {
              toast.error("Payment verification failed!");
            }
          } catch (err) {
            console.error(err);
            toast.error("Error verifying payment");
          }
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Error creating order");
    }
  };

  return (
    <button
      onClick={handleUpgrade}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Upgrade to Premium
    </button>
  );
}
