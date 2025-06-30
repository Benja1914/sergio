import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost, fetchPosts, removePost } from "@/store/postStore/thunk";
import { Post, PostState } from "@/store/postStore/interfaces";
import { createPost, filterPostsByName } from "@/store/postStore/postSlice";
import { PlpFilters } from "@/components/filter/Filters";
import { filtersConfig } from "@/mock";
import Card from "@/components/Card";

const Posts = () => {
  //const dispatch = useDispatch();
  const [activeFilters, setActiveFilters] = useState<any[]>([]);
  const [search, setSearch] = useState('')



  return (
    <React.Fragment>

      <div className="w-full h-full grid grid-cols-[28%_auto] gap-8 py-14 px-4">
        <PlpFilters
          filtersConfig={filtersConfig}
          onFiltersChange={setActiveFilters}
          onSearch={setSearch}
        />
        <div>
          <div className="w-full h-[68px] flex justify-center items-center gap-3">
            <div>
              <span className="text-white font-lato text-[20px] font-normal">Commission</span>
            </div>
            <div>
              <span className="text-white font-lato text-[24px] font-bold underline border-l-2 border-r-2 border-white px-4">YCH</span>          </div>
            <div>
              <span className="text-white font-lato text-[20px] font-normal">Adoptable</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 24 }).map((_, idx) => (
              <Card
                key={idx}
                image={"/assets/images/image_test_card.png"}
                titulo={`Example Title Auction examp YCH ${idx + 1}`}
                subtitulo={"Artist Name Example"}
                sb={180}
                mb={20}
                isPromoted={idx % 2 === 0}
                time={"15 hours"}
              />
            ))}
          </div>
        </div>


      </div>

    </React.Fragment>
  );
};

export default Posts;
