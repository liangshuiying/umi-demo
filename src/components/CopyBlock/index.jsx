
import React from 'react';

export default connect(({ routing }) => ({
  location: routing.location,
}))(({ location }) => {
  return (
    <div>

    </div>
  );
});
