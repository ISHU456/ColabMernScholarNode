import Quiz from '../models/Quiz.js';

export const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const quiz = await Quiz.findByIdAndUpdate(id, updateData, { new: true });
    if (!quiz) return res.status(404).json({ message: "Quiz node not found" });

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
