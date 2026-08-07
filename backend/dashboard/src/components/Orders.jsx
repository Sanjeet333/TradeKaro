import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const Orders = () => {
  const { refreshTrigger } = useOutletContext();
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get('/allOrders')
      .then((res) => setAllOrders(res.data))
      .catch((err) => console.error('Failed to fetch orders:', err))
      .finally(() => setLoading(false));
  }, [refreshTrigger]);

  return (
    <div className="w-full p-4 md:p-6 bg-white min-h-screen text-ink font-body">
      <div className="border-b border-brand-light/60 pb-3 mb-4">
        <h3 className="font-heading text-lg md:text-xl font-bold text-brand-dark">
          Orders ({allOrders.length})
        </h3>
      </div>
      {loading ? (
        <div className="text-center text-ink/40 text-sm mt-8 font-medium">
          Loading Orders...
        </div>
      ) : allOrders.length === 0 ? (
        <div className="text-center text-ink/40 text-sm mt-8 font-medium">
          No orders placed yet
        </div>
      ) : (
        <>
          {/* ---------- Desktop Table ---------- */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="text-xs font-semibold text-brand-mid border-b border-brand-light/60 uppercase tracking-wider">
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Instrument</th>
                  <th className="py-3 px-4 text-right">Type</th>
                  <th className="py-3 px-4 text-right">Qty.</th>
                  <th className="py-3 px-4 text-right">Price</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-light/40 text-sm">
                {allOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-brand-pale/40 transition-colors duration-150"
                  >
                    <td className="py-3 px-4 text-ink/40 text-xs">
                      {new Date(order.createdAt).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-brand-dark font-semibold">
                      {order.name}
                    </td>
                    <td
                      className={`py-3 px-4 text-right font-semibold ${order.mode === 'BUY' ? 'text-[#1D9E75]' : 'text-[#D85A30]'}`}
                    >
                      {order.mode}
                    </td>
                    <td className="py-3 px-4 text-right text-ink/80 font-medium">
                      {order.qty}
                    </td>
                    <td className="py-3 px-4 text-right text-ink/80 font-medium">
                      {order.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right text-ink/40 text-xs">
                      Executed
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ---------- Mobile Card View  ---------- */}
          <div className="block md:hidden space-y-2">
            {allOrders.map((order) => (
              <div
                key={order._id}
                className="border border-brand-light/60 rounded-xl p-3 bg-white shadow-sm hover:border-brand-mid transition-colors duration-200"
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="font-semibold text-brand-dark text-sm truncate font-heading">
                    {order.name}
                  </p>
                  <span
                    className={`text-xs font-bold ${order.mode === 'BUY' ? 'text-[#1D9E75]' : 'text-[#D85A30]'}`}
                  >
                    {order.mode}
                  </span>
                </div>
                <p className="text-[11px] text-ink/40">
                  {new Date(order.createdAt).toLocaleString('en-IN')}
                </p>
                <div className="grid grid-cols-3 gap-2 text-xs mt-2 pt-2 border-t border-brand-light/50">
                  <div>
                    <p className="text-ink/40 text-[10px] uppercase">Qty</p>
                    <p className="font-medium text-ink/80 mt-0.5">
                      {order.qty}
                    </p>
                  </div>
                  <div>
                    <p className="text-ink/40 text-[10px] uppercase">Price</p>
                    <p className="font-medium text-ink/80 mt-0.5">
                      ₹{order.price.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-ink/40 text-[10px] uppercase">Status</p>
                    <p className="font-medium text-ink/40 mt-0.5">Executed</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
