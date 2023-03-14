import Course from '../Models/Course.js'

export const getAllCourse = async (req, res) => {
  try {
    const getAllCourse = await Course.find().populate('reviews').populate('authorData','_id firstname lastname')
    res.status(200).json(getAllCourse)
    return 
  } catch (err) {
    res.status(500).json(err)
    return 
  }
}

export const getCourse = async (req, res) => {
  try {
    const getCourse = await Course.findById(req.params.id).populate('reviews')
    if (!getCourse) res.status(404).send('Course not found...')
    res.status(200).json(getCourse)
    return 
  } catch (err) {
    res.status(500).json(err)
    return 
  }
}

export const addCourse = async (req, res) => {
  const newCourse = new Course({
    title: req.body.title,
    authorData:req.user.id,
    ...req.body,
  })
  try {
    await newCourse.save()
    res.status(200).json(newCourse)
    return 
  } catch (err) {
    res.status(400).json(err)
    return 
  }
}

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) res.status(404).send('Course not found...')
    if (course.userId === req.body.userId) {
      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true },
      )
      res.status(200).json(updatedCourse)
      return 
    }
  } catch (err) {
    res.status(500).json(err)
    return 
  }
}
