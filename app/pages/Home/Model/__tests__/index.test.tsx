import { renderHook, act, waitFor } from "@testing-library/react";

import useModel, { BlogPost } from "..";
import { IHomeModel } from "../../types";

import { useFetch, useError } from "~/hooks";
import * as Utils from "../../Utils";

jest.mock("~/hooks");

const mockGet = jest.fn();
const mockHandleErr = jest.fn();
const utilSpy = jest.spyOn(Utils, "getRandomValue");

const FakeComponent = () => <h1>Fake Component</h1>;

describe("the home page model", () => {
  const fakeErr = new Error("some err");
  afterEach(() => {
    jest.resetAllMocks();
  });
  beforeEach(() => {
    (useError as jest.Mock).mockReturnValue({
      err: null,
      handleError: mockHandleErr,
      ErrorComponent: FakeComponent,
    });
  });
  describe("given that the api returns an error", () => {
    beforeEach(() => {
      mockGet.mockResolvedValue(fakeErr);
      (useFetch as jest.Mock).mockReturnValue({
        get: mockGet,
      });
      renderHook(useModel);
    });

    it("will call the error handler func", async () => {
      expect(mockGet).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      expect(mockHandleErr).toHaveBeenCalledWith(fakeErr);
    });
  });
  describe("given that the api returns a valid response", () => {
    beforeEach(() => {
      mockGet
        .mockResolvedValueOnce({
          userId: 1,
          id: 1,
          title: "1st mock",
          body: "1st mock",
        })
        .mockResolvedValueOnce({
          userId: 1,
          id: 2,
          title: "2nd mock",
          body: "2nd mock",
        });

      (useFetch as jest.Mock).mockReturnValue({
        get: mockGet,
      });

      utilSpy.mockReturnValue(2);
    });

    it("will not call the error handler func", async () => {
      renderHook(() => useModel());
      expect(mockGet).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      expect(mockHandleErr).not.toHaveBeenCalled();
    });
    it("will call the get request again if the onClick action is fired", async () => {
      const { result } = renderHook(useModel);

      await waitFor(() => {
        expect(result.current.state.results).toBeInstanceOf(BlogPost);
        expect(result.current.state.results?.id).toEqual(1);
        expect(result.current.state.results?.title).toEqual("1st mock");
      });

      act(() => {
        result.current.actions.handleClick();
      });

      expect(mockGet).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/posts/2"
      );

      await waitFor(() => {
        expect(result.current.state.results).toBeInstanceOf(BlogPost);
        expect(result.current.state.results?.id).toEqual(2);
        expect(result.current.state.results?.title).toEqual("2nd mock");
      });
    });
  });
});
