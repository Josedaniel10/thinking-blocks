export const updateLastOpened = async (Model, id) => {
  return Model.findOneAndUpdate(
    {
      _id: id,
      isArchived: false,
    },
    {
      lastOpenedAt: new Date(),
    },
    {
      returnDocument: "after",
    }
  )
}