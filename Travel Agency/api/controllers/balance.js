export const getCount = async (req, res, next) => {
    try {
      const count = 0;
      res.status(200).json({ count: count });
    } catch (err) {
      next(err);
    }
  };