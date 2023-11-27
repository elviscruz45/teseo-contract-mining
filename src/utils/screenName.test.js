const searchStack = {
  tab: "SearchTab",
  search: "Search",
  item: "Item",
  moreDetail: "MoreDetail",
  pdf: "Pdf",
  detail: "Detail",
  polines: "Polines",
  approve: "Approve",
  editAIT: "EditAIT",
  addDocs: "AddDocs",
};

describe("searchStack object", () => {
  test("should have the correct value for the 'tab' property", () => {
    expect(searchStack.tab).toBe("SearchTab");
  });

  test("should have the correct value for the 'search' property", () => {
    expect(searchStack.search).toBe("Search");
  });

  test("should have the correct value for the 'item' property", () => {
    expect(searchStack.item).toBe("Item");
  });

  test("should have the correct value for the 'moreDetail' property", () => {
    expect(searchStack.moreDetail).toBe("MoreDetail");
  });

  test("should have the correct value for the 'pdf' property", () => {
    expect(searchStack.pdf).toBe("Pdf");
  });

  test("should have the correct value for the 'detail' property", () => {
    expect(searchStack.detail).toBe("Detail");
  });

  test("should have the correct value for the 'polines' property", () => {
    expect(searchStack.polines).toBe("Polines");
  });

  test("should have the correct value for the 'approve' property", () => {
    expect(searchStack.approve).toBe("Approve");
  });

  test("should have the correct value for the 'editAIT' property", () => {
    expect(searchStack.editAIT).toBe("EditAIT");
  });

  test("should have the correct value for the 'addDocs' property", () => {
    expect(searchStack.addDocs).toBe("AddDocs");
  });
});
