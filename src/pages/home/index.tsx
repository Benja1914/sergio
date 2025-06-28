import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost, fetchPosts, removePost } from "@/store/postStore/thunk";
import { Post, PostState } from "@/store/postStore/interfaces";
import { createPost, filterPostsByName } from "@/store/postStore/postSlice";
import { PlpFilters } from "@/components/filter/Filters";
import { filtersConfig } from "@/mock";

const Posts = () => {
  //const dispatch = useDispatch();
  const [activeFilters, setActiveFilters] = useState<any[]>([]);
  const [search, setSearch] = useState('')



  return (
    <React.Fragment>

      <div className="w-full h-full grid grid-cols-[30%_auto] gap-8 py-14 px-4">
        <PlpFilters
          filtersConfig={filtersConfig}
          onFiltersChange={setActiveFilters}
          onSearch={setSearch}
        />
        <div>
          {/* Add your posts or content here */}
        </div>
      </div>

    </React.Fragment>
  );
};

export default Posts;
