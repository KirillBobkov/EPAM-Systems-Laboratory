import { formatDate } from "./formatDate";

describe("formatDate", () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const russianMonthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
  ];

  it("should format years as four digit string", () => {
    const result = formatDate(
      new Date(2015, 2, 4, 5, 7, 8),
      "yyyy_MM_dd HH_mm_ss",
      months
    );

    expect(result).toEqual("2015_03_04 05_07_08");
  });

  it("should format years and month as two digit string", () => {
    const result = formatDate(
      new Date(2015, 2, 4, 5, 7, 8),
      "yy_MM_dd HH_mm_ss",
      months
    );

    expect(result).toEqual("15_03_04 05_07_08");
  });

  it("should format month as one digit string", () => {
    const result = formatDate(
      new Date(2015, 2, 4, 5, 7, 8),
      "yy_M_dd HH_mm_ss",
      months
    );

    expect(result).toEqual("15_3_04 05_07_08");
  });

  it("should format month as three digit string", () => {
    const result = formatDate(
      new Date(2015, 2, 4, 5, 7, 8),
      "yy_MMM_dd HH_mm_ss",
      months
    );

    expect(result).toEqual("15_Mar_04 05_07_08");
  });

  it("should format month as four digit string", () => {
    const result = formatDate(
      new Date(2015, 2, 4, 5, 7, 8),
      "yy_MMMM_dd HH_mm_ss",
      russianMonthNames
    );

    expect(result).toEqual("15_Март_04 05_07_08");
  });

  it("should format days as one digit string", () => {
    const result = formatDate(
      new Date(2015, 2, 4, 5, 7, 8),
      "yy_MMMM_d HH_mm_ss",
      months
    );

    expect(result).toEqual("15_March_4 05_07_08");
  });

  it("should format days as two digit string", () => {
    const result = formatDate(
      new Date(2015, 2, 4, 5, 7, 8),
      "yy_MMMM_dd HH_mm_ss",
      months
    );

    expect(result).toEqual("15_March_04 05_07_08");
  });

  it("should format hours as one digit string", () => {
    const result = formatDate(
      new Date(2015, 2, 4, 17, 7, 8),
      "yy_MMMM_dd H_mm_ss",
      months
    );

    expect(result).toEqual("15_March_04 17_07_08");
  });

  it("should format hours as two digit string", () => {
    const result = formatDate(
      new Date(2015, 2, 4, 5, 7, 8),
      "yy_MMMM_dd HH_mm_ss",
      months
    );

    expect(result).toEqual("15_March_04 05_07_08");
  });

  it("should format hours as one digit string", () => {
    const result = formatDate(
      new Date(2015, 2, 4, 17, 7, 8),
      "yy_MMMM_dd h_mm_ss",
      months
    );

    expect(result).toEqual("15_March_04 5PM_07_08");
  });

  it("should format hours as two digit string", () => {
    const result = formatDate(
      new Date(2015, 2, 4, 17, 7, 8),
      "yy_MMMM_dd hh_mm_ss",
      months
    );

    expect(result).toEqual("15_March_04 05PM_07_08");
  });

  it("should format minutes as one digit string", () => {
    const result = formatDate(
      new Date(2015, 2, 4, 17, 7, 8),
      "yy_MMMM_dd hh_m_ss",
      months
    );

    expect(result).toEqual("15_March_04 05PM_7_08");
  });

  it("should format minutes as two digit string", () => {
    const result = formatDate(
      new Date(2015, 2, 4, 17, 7, 8),
      "yy_MMMM_dd hh_mm_ss",
      months
    );

    expect(result).toEqual("15_March_04 05PM_07_08");
  });

  it("should format seconds as one digit string", () => {
    const result = formatDate(
      new Date(2015, 2, 4, 17, 7, 8),
      "yy_MMMM_dd hh_mm_s",
      months
    );

    expect(result).toEqual("15_March_04 05PM_07_8");
  });

  it("should format seconds as two digit string", () => {
    const result = formatDate(
      new Date(2015, 2, 4, 17, 7, 8),
      "yy_MMMM_dd hh_mm_ss",
      months
    );

    expect(result).toEqual("15_March_04 05PM_07_08");
  });

  it("should format date in ddMMyyyyTHHmmssZ format", () => {
    const result = formatDate(
      new Date(2015, 2, 4, 5, 7, 8),
      "ddMMyyyyTHHmmssZ",
      months
    );

    expect(result).toEqual("04032015T050708Z");
  });

  it("should format date in HH hh M MM MMM MMMM m mm format", () => {
    const result = formatDate(
      new Date(2015, 2, 4, 23, 7, 8),
      "HH hh M MM MMM MMMM m mm",
      months
    );

    expect(result).toEqual("23 11PM 3 03 Mar March 7 07");
  });

  it("should use russian month names to format date in yy.MMM.dd format ", () => {
    const result = formatDate(
      new Date(2019, 10, 7),
      "yy.MMM.dd",
      russianMonthNames
    );

    expect(result).toEqual("19.Ноя.07");
  });

  it("should use russian month names to format date in yy.MMMM.dd format ", () => {
    const result = formatDate(
      new Date(2019, 10, 25),
      "yy.MMMM.dd",
      russianMonthNames
    );

    expect(result).toEqual("19.Ноябрь.25");
  });
});

