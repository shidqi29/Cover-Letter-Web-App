import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const CoverLetterForm: React.FC = () => {
  const [jobPosterPreview, setJobPosterPreview] = useState<string | null>(null);
  const [cvPreview, setCvPreview] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<string>('Not tested');

  // Test API connection on component mount
  useEffect(() => {
    const testApiConnection = async () => {
      try {
        const response = await axios.get('/api/test');
        setApiStatus(`API test successful: ${response.data.message}`);
        console.log('API test response:', response.data);
      } catch (err) {
        setApiStatus('API test failed');
        console.error('API test error:', err);
      }
    };

    testApiConnection();
  }, []);

  const handleJobPosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setJobPosterPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCvPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTestEndpoint = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/test', {
        testData: 'This is a test',
      });
      setCoverLetter(JSON.stringify(response.data, null, 2));
    } catch (err) {
      console.error('Test API error details:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'An error occurred while testing API');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const language = (document.querySelector('input[name="language"]:checked') as HTMLInputElement)?.value || 'english';
      const jobPosterFile = (document.querySelector('#jobPoster') as HTMLInputElement)?.files?.[0];
      const cvFile = (document.querySelector('#cv') as HTMLInputElement)?.files?.[0];

      const formData = new FormData();
      formData.append('language', language);
      if (jobPosterFile) {
        formData.append('jobPoster', jobPosterFile);
      }
      if (cvFile) {
        formData.append('cv', cvFile);
      }

      const response = await axios.post('/api/generate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setCoverLetter(response.data.coverLetter);
    } catch (err) {
      console.error('Error details:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'An error occurred while generating the cover letter');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Generate Cover Letter</CardTitle>
        <div className="text-sm text-gray-500">API Status: {apiStatus}</div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="jobPoster">Upload Job Poster (Image)</Label>
            <Input id="jobPoster" type="file" accept="image/*" onChange={handleJobPosterChange} />
            {jobPosterPreview && (
              <div className="mt-2">
                <img src={jobPosterPreview} alt="Job Poster Preview" className="w-full h-auto" />
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="cv">Upload CV (PDF/DOC)</Label>
            <Input id="cv" type="file" accept=".pdf,.doc,.docx" onChange={handleCvChange} />
            {cvPreview && (
              <div className="mt-2">
                <iframe src={cvPreview} className="w-full h-64" title="CV Preview" />
              </div>
            )}
          </div>
          <div>
            <Label>Select Language</Label>
            <RadioGroup defaultValue="english" className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="english" id="english" />
                <Label htmlFor="english">English</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="indonesian" id="indonesian" />
                <Label htmlFor="indonesian">Bahasa Indonesia</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex space-x-2">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Generating...' : 'Generate Cover Letter'}
            </Button>
            <Button type="button" onClick={handleTestEndpoint} className="flex-1" disabled={loading}>
              Test API
            </Button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {coverLetter && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-bold">Generated Cover Letter:</h3>
            <p className="whitespace-pre-wrap">{coverLetter}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CoverLetterForm; 