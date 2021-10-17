import { useState } from "react";
import { toast } from "react-toastify";
import s from "./Searchbar.module.css";
import PropTypes from "prop-types";

export default function SearchBar({ onSubmit }) {
  const [searchValue, setsearchValue] = useState("");

  function handlerSubmit(e) {
    e.preventDefault();
    if (searchValue.trim() === "") {
      toast.error("enter search word");
      return;
    }
    onSubmit(searchValue);
    setsearchValue("");
  }

  function handlerSearch(e) {
    setsearchValue(e.currentTarget.value);
  }

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handlerSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchForm_button}>
          <span className={s.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={s.SearchForm_input}
          type="text"
          onChange={handlerSearch}
          value={searchValue}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
