export const handleOnDragEnd = (result, lists, sort) => {
  // ドロップ先がない
  if (!result.destination) {
    return;
  }
  const [reorderedItem] = lists.splice(result.source.index, 1);
  lists.splice(result.destination.index, 0, reorderedItem);
  sortLists(reorderedItem, lists, sort)
}


const sortLists = async (reorderedItem, lists, sort) => {

  const getAroundList = () => {
    let prevItem = null;
    let nextItem = null;
    // 要素を先頭にドラッグ&ドロップした場合
    if (reorderedItemIndex == 0) {
      //先頭にした場合は、後ろの値だけ取ってくる
      nextItem = lists[reorderedItemIndex + 1];
    } else if (lists.slice(-1)[0].id == lists[reorderedItemIndex].id) {
      // 配列の最後の要素とドラッグ&ドロップの要素が同じな場合（要素を最後にドラッグ&ドロップした場合）
      //最後の場合は、前の値のみ取ってくる
      prevItem = lists[reorderedItemIndex - 1];
    } else {
      prevItem = lists[reorderedItemIndex - 1];
      nextItem = lists[reorderedItemIndex + 1];
    }
    return [prevItem, nextItem];
  }

  const reorderedItemIndex = lists.findIndex(({id}) => id === reorderedItem.id);
  const [prevItem, nextItem] = getAroundList();
  console.log(prevItem);
  console.log(nextItem);
  const displayOrder = {
    begin_item: prevItem, end_item: nextItem
  };

  sort(reorderedItem.id, displayOrder);
}