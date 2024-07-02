import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Cancel';
import { CardMedia, Skeleton } from '@mui/material';

function srcset(image, rows = 1, cols = 1) {
    return {
        image: image,
        sx: { width: '100%', aspectRatio: '1/1' }
    };
}

export default function CustomImageList({ itemData, handleRemove,loading ,fileImage}) {
    return (
        <ImageList
            sx={{ 
                transform: 'translateZ(0)',
                display: 'flex', 
                overflowY: 'scroll',
                maxHeight:'180px',
                flexWrap:'wrap', 
            }} 
        >
            {loading ? fileImage.map((dat,index) => <Skeleton
            key={index}
                sx={{ bgcolor: 'grey.900', width: (97 / 4) + '%', aspectRatio: '1/1', height:200 }}
                variant="rectangular" 
            />) : ''}
            {itemData.map((item, index) => {
                const cols = 4;
                const rows = 1;

                return (
                    <ImageListItem key={index} cols={cols} rows={rows}
                        sx={{ width: (97 / cols) + '%', aspectRatio: '1/1' }}
                    >
                        <CardMedia
                            {...srcset(item, rows, cols)}
                            alt={`image ${index}`}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            sx={{
                                background:
                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                            }}
                            title=""
                            position="top"
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'white' }}
                                    aria-label={`close ${index}`}
                                    onClick={() => handleRemove(index)}
                                >
                                    <CloseIcon />
                                </IconButton>
                            }
                            actionPosition="right"
                        />
                    </ImageListItem>
                );
            })}
        </ImageList>
    );
}
