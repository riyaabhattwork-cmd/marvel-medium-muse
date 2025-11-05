import { motion } from "framer-motion";

const OurStory = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-serif font-bold text-[#242424] mb-6"
      >
        Our Story
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg text-[#6B6B6B] leading-relaxed mb-6"
      >
        Scribe was built with a simple idea — to give everyone a voice. A place
        where thoughts turn into stories and stories spark ideas that move the
        world forward.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg text-[#6B6B6B] leading-relaxed mb-6"
      >
        Our community believes in the power of words. Whether you’re a seasoned
        writer or someone who’s just getting started, Scribe offers the space,
        the tools, and the readers to make your ideas matter.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-lg text-[#6B6B6B] leading-relaxed"
      >
        Together, we’re building a home for stories that inspire, challenge, and
        connect us — one idea at a time.
      </motion.p>
    </div>
  );
};

export default OurStory;
