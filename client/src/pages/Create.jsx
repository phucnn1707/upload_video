import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTextScripts } from '../redux/actions/textScriptActions';
import BlockAiList from '../components/List_BlockAi';
import { fetchAvatars } from '../redux/actions/avatarAction';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS DatePicker

const Create = () => {
  const dispatch = useDispatch();
  const [filterDate, setFilterDate] = useState(null); // Lưu giá trị ngày đã chọn (null ban đầu)

  const { loading: scriptsLoading, textScripts, error: scriptsError } = useSelector((state) => state.textScripts);
  const { loading: avatarsLoading, avatars, error: avatarsError } = useSelector((state) => state.avatars);

  useEffect(() => {
    dispatch(fetchTextScripts());
    dispatch(fetchAvatars());
  }, [dispatch]);

  // Lọc textScripts theo ngày, tháng, năm
  const filteredScripts = textScripts.filter((script) => {
    if (!filterDate) return true; // Nếu không chọn ngày, hiển thị tất cả

    const scriptDate = new Date(script.createdAt);
    return (
      scriptDate.getFullYear() === filterDate.getFullYear() &&
      scriptDate.getMonth() === filterDate.getMonth() &&
      scriptDate.getDate() === filterDate.getDate()
    );
  });

  return (
    <div className="container create">
      <div className="blockHead blockFilter">
        <div className="tit">動画スクリプト</div>
        <div className="filter">
          <DatePicker
            selected={filterDate}
            onChange={(date) => setFilterDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="yyyy/mm/dd"
            className="input-date"
          />
        </div>
      </div>

      {scriptsLoading || avatarsLoading ? (
        <p>Loading...</p>
      ) : scriptsError ? (
        <p>Error: {scriptsError}</p>
      ) : avatarsError ? (
        <p>Error: {avatarsError}</p>
      ) : filteredScripts.length === 0 ? ( // Kiểm tra nếu không có kết quả sau khi lọc
        <p>No scripts available for the selected date.</p>
      ) : (
        <BlockAiList blocks={filteredScripts} avatars={avatars} />
      )}
    </div>
  );
};

export default Create;
