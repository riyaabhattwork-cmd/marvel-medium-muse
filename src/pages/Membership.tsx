import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Membership = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-serif font-bold text-[#242424] mb-8"
      >
        Become a Member
      </motion.h1>

      <p className="text-lg text-[#6B6B6B] mb-12 max-w-2xl mx-auto">
        Support great writing and get unlimited access to the ideas shaping our
        world. Join a growing community of thinkers and creators.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all"
        >
          <h2 className="text-2xl font-serif font-semibold text-[#242424] mb-4">
            Free Plan
          </h2>
          <p className="text-[#6B6B6B] mb-6">
            Read limited stories every month and explore trending topics.
          </p>
          <p className="text-3xl font-bold text-[#242424] mb-6">₹0/month</p>
          <Button variant="outline" className="w-full">
            Continue Free
          </Button>
        </motion.div>

        {/* Premium Plan */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all bg-[#F9FAF9]"
        >
          <h2 className="text-2xl font-serif font-semibold text-[#242424] mb-4">
            Premium Plan
          </h2>
          <p className="text-[#6B6B6B] mb-6">
            Write unlimited stories, gain readers, and enjoy an ad-free
            experience.
          </p>
          <p className="text-3xl font-bold text-[#1A8917] mb-6">₹299/month</p>
          <Button className="w-full bg-[#1A8917] text-white hover:bg-[#0F730C]">
            Upgrade Now
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Membership;
