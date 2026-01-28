import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Chip,
  IconButton,
  TextField,
  MenuItem,
  alpha,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../api/posts.api";
import PostsDrawer from "../components/posts/PostsDrawer";
import type { Post } from "../types/post";
import { usePostsDrawer } from "../hook/usePostsDrawer";

// Immagini placeholder per i posts
const getPostImage = (postId: string) => {
  const images = [
    "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=200&fit=crop", 
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
  ];
  return images[parseInt(postId) % images.length];
};

// Categorie per i posts
const getPostCategory = (postId: string) => {
  const categories = [
    { name: "TECH", color: "#1DB584" },
    { name: "LIFESTYLE", color: "#FF6B6B" },
    { name: "BUSINESS", color: "#4ECDC4" },
    { name: "NEWS", color: "#FFE66D" },
  ];
  return categories[parseInt(postId) % categories.length];
};

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("All Categories");
  const navigate = useNavigate();
  
  const { drawerOpen, drawerMode, selectedPost, openCreate, openEdit, close } = usePostsDrawer();

  async function fetchPosts() {
    setLoading(true);
    setErrorMsg(null);

    try {
      const data = await getPosts();
      setPosts(data);
    } catch {
      setErrorMsg("Errore nel caricamento dei posts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "2-digit", 
      year: "numeric" 
    });
  }

  function handleEditPost(post: Post) {
    openEdit(post);
  }

  function handleViewPost(postId: number) {
    navigate(`/posts/${postId}`);
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (errorMsg) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography color="error">{errorMsg}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Posts Management
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "success.main",
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {posts.length}/2 Total Published Posts
            </Typography>
          </Box>
        </Box>
        
        <Stack direction="row" spacing={2}>
          <IconButton
            sx={{
              bgcolor: alpha("#ffffff", 0.1),
              "&:hover": { bgcolor: alpha("#ffffff", 0.2) },
            }}
          >
            <DownloadIcon />
          </IconButton>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreate}
            sx={{
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            Create New Post
          </Button>
        </Stack>
      </Stack>

      {/* Filters */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          placeholder="Filter by title"
          variant="outlined"
          size="small"
          sx={{
            minWidth: 200,
            "& .MuiOutlinedInput-root": {
              bgcolor: alpha("#ffffff", 0.05),
            },
          }}
        />
        <TextField
          placeholder="Search author"
          variant="outlined" 
          size="small"
          sx={{
            minWidth: 150,
            "& .MuiOutlinedInput-root": {
              bgcolor: alpha("#ffffff", 0.05),
            },
          }}
        />
        <TextField
          select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          size="small"
          sx={{
            minWidth: 150,
            "& .MuiOutlinedInput-root": {
              bgcolor: alpha("#ffffff", 0.05),
            },
          }}
        >
          <MenuItem value="All Categories">All Categories</MenuItem>
          <MenuItem value="TECH">TECH</MenuItem>
          <MenuItem value="LIFESTYLE">LIFESTYLE</MenuItem>
          <MenuItem value="BUSINESS">BUSINESS</MenuItem>
          <MenuItem value="NEWS">NEWS</MenuItem>
        </TextField>
        <TextField
          placeholder="YYYY-MM-DD"
          variant="outlined"
          size="small"
          sx={{
            minWidth: 130,
            "& .MuiOutlinedInput-root": {
              bgcolor: alpha("#ffffff", 0.05),
            },
          }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterIcon />}
          sx={{ minWidth: 100 }}
        >
          CLEAR
        </Button>
      </Stack>

      {/* Posts Cards */}
      <Stack spacing={2}>
        {posts.map((post) => {
          const category = getPostCategory(post.id.toString());
          
          return (
            <Card
              key={post.id}
              sx={{
                display: "flex",
                bgcolor: "background.paper",
                border: 1,
                borderColor: "divider",
                "&:hover": {
                  borderColor: "primary.main",
                  bgcolor: alpha("#1DB584", 0.02),
                },
                transition: "all 0.2s",
              }}
            >
              {/* Post Image */}
              <CardMedia
                component="img"
                sx={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                }}
                image={getPostImage(post.id.toString())}
                alt={post.title}
              />
              
              {/* Content */}
              <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box sx={{ flex: 1, mr: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {post.content || "Exploring how LLMs are reshaping the UI/UX landscape..."}
                    </Typography>
                    
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: "primary.main",
                          fontSize: "0.875rem",
                        }}
                      >
                        JC
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          Jane Cooper
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(post.createdAt || new Date().toISOString())}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                    {/* Category Badge */}
                    <Chip
                      label={category.name}
                      size="small"
                      sx={{
                        bgcolor: category.color,
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    />
                    
                    {/* Actions */}
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleViewPost(post.id)}
                        sx={{
                          "&:hover": { bgcolor: alpha("#4ECDC4", 0.1) },
                        }}
                      >
                        <ViewIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleEditPost(post)}
                        sx={{
                          "&:hover": { bgcolor: alpha("#1DB584", 0.1) },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          "&:hover": { bgcolor: alpha("#FF6B6B", 0.1) },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Stack>

      {/* Pagination Footer */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body2" color="text.secondary">
          ROWS PER PAGE: 10
        </Typography>
        <Typography variant="body2" color="text.secondary">
          1-10 OF 842
        </Typography>
      </Box>

      {/* Drawer */}
      <PostsDrawer
        open={drawerOpen}
        mode={drawerMode}
        onClose={close}
        initialPost={selectedPost}
        onSaved={() => {
          close();
          fetchPosts();
        }}
      />
    </Box>
  );
}